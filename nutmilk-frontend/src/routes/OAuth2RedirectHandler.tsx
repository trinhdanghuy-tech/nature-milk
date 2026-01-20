import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function OAuth2RedirectHandler() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get("token");
        const username = searchParams.get("username");
        const role = searchParams.get("role");

        if (token) {
            // Save to localStorage
            localStorage.setItem("token", token);

            const user = {
                username: username,
                role: { name: role }, // Handle potentially missing role object structure
                fullName: username // Fallback
            };
            localStorage.setItem("user", JSON.stringify(user));

            // Redirect based on role
            if (role === "ADMIN") {
                navigate("/admin/dashboard", { replace: true });
            } else {
                navigate("/dashboard", { replace: true });
            }
        } else {
            // Error or cancelled
            navigate("/login?error=oauth2_failed", { replace: true });
        }
    }, [searchParams, navigate]);

    return (
        <div className="h-screen flex items-center justify-center">
            <p>Đang xử lý đăng nhập...</p>
        </div>
    );
}
