import WithSkeleton from "@/components/skeleton"
import Logo from "@/assets/_pic.png_.avif";
const LogoAside = () => {
    return (
        <div className="demo-logo-vertical" >
            <img src={Logo}  alt="" />
        </div>
    )
}
export default WithSkeleton(LogoAside,{loading:true})