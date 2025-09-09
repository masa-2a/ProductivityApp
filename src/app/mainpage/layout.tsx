import { Metadata } from "next";
import "./global.css";
import style from "./mainpage.module.css";

export const metadata: Metadata = {
    title: "Workspace",
};

export default function MainpageLayout({
    children,
}: Readonly<{children: React.ReactNode;}>) {
    return <section className = {style.workspace}>{children} </section>
}