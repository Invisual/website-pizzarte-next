
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { useMessages } from "next-intl";



export default function NotFoundPage({ params }) {
    const { locale } = use(params);

    setRequestLocale(locale);

    const messages = useMessages();


    return (
        <>
            <div
                style={{
                    background:
                        "linear-gradient(180deg, #E6E6E6 0%, rgba(230,230,230,1) 100%)",
                }}
            >
            </div>
        </>
    )

}