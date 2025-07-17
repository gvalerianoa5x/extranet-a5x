import { useEffect } from "react";

export default function MainContainerSuporte() {
    useEffect(() => {
        console.log("Suporte carregado");

        return () => {
            console.log("Saindo do suporte, limpando recursos...");
        };
    }, []);

    return (
        <div className="flex-1 p-5 overflow-auto space-y-5">
            <div className="flex-1 h-full">
                <iframe
                    src="https://a5x-dev.4biz.one/4biz/pages/smartPortal/smartPortal.load"
                    title="Suporte"
                    className="w-full h-[calc(100vh-150px)] border-none"
                />
            </div>
        </div>
    );
}
