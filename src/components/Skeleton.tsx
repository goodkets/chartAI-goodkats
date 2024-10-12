import React from 'react';
import { Skeleton } from 'antd';


function WithSkeleton<T extends object>(WrappedComponent: React.ComponentType<T>,setting?:object) {
  return (props: T) => {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
      // 模拟异步加载
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1200);

      // 清理定时器
      return () => clearTimeout(timer);
    }, []);

    return (
      <React.Fragment>
        {isLoading ? (
          <Skeleton active {...setting} />
        ) : (
          <WrappedComponent {...props} />
        )}
      </React.Fragment>
    );
  };
}

export default WithSkeleton;