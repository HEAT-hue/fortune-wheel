'use client'
import { LoginUser } from "@/lib/actions"
import { useRouter } from "next/navigation"
import { CSSProperties, useState } from "react"
import { BeatLoader } from "react-spinners"
import Link from "next/link"

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const LoginPage = () => {

    // const searchParams = useSearchPara// const redirect = searchParams.get('redirect')ms();

    return (
        <div className="flex flex-row items-center overflow-hidden h-screen">

            <div className="w-full h-full flex flex-col items-center justify-center login-whitebg">
                {/* Logo */}
                <div className="flex justify-center">
                    <p className="text-ecobankLightTeal text-[2rem] md:text-[2.5rem] text-center border-b-[4px] md:border-b-[6px] border-b-ecobankGreen font-Aladin-Regular">
                        Sign in
                    </p>
                </div>
                <div className="mt-6 md:mt-8">
                    <Login />
                </div>
            </div>
        </div>
    );
};

const Login: React.FC = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setErrorMessage] = useState<String>("");
    const [submissionPending, setSubmissionPending] = useState<boolean>(false);
    const router = useRouter();


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // Set button pending state
        setSubmissionPending(true);

        // Clear error messages
        setErrorMessage("");

        if (!email || !password) {
            setErrorMessage("Incomplete credentials!");
            setSubmissionPending(false);
            return;
        }

        const response = await LoginUser({ email, password });

        if (!response.status) {
            setErrorMessage(response.data);
            setSubmissionPending(false);
            return;
        }

        router.push("/app");
    }

    return (
        <>
            <form onSubmit={handleSubmit} method="POST">
                {error && <p className="text-xs text-right text-error">{error}</p>}
                <div className="flex flex-col gap-y-5 mt-5">
                    {/* Email */}
                    <div className="flex flex-col gap-y-2">
                        <label
                            htmlFor="email"
                            className="text-sm font-Gilroy-SemiBold"
                        >
                            Staff ID/Email Address
                        </label>
                        <input
                            required
                            className="outline-none w-[90vw] max-w-[340px] border-[1.2px]  border-ecobankLightTeal p-2 rounded-md"
                            type="email"
                            name="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="email" className="text-sm font-Gilroy-SemiBold">
                            Password
                        </label>
                        <input
                            required
                            className="outline-none w-[90vw] max-w-[340px] border-[1.2px]  border-ecobankLightTeal focus:shadow  p-2 rounded-md"
                            type="password"
                            name="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                </div>

                <button
                    className="bg-ecobankBlue rounded w-[90vw] max-w-[340px] py-3 mt-8 text-sm text-white focus:outline-none"
                    type="submit"
                    disabled={submissionPending}
                >
                    {" "}
                    {submissionPending ? (
                        <BeatLoader
                            color={"#ffffff"}
                            loading={true}
                            cssOverride={override}
                            size={10}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    ) : (
                        "Log in"
                    )}
                </button>
            </form>
        </>
    );
};

export default LoginPage;
