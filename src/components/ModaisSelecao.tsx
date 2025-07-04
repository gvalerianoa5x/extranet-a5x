import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface Props {
    onFinalizar: () => void;
}

const ModaisSelecao: React.FC<Props> = ({ onFinalizar }) => {
    const [step, setStep] = useState(1);
    const [participantCode, setParticipantCode] = useState<any>(null);
    const [participationType, setParticipationType] = useState<any>(null);

    const participantes = [
        { value: '001', label: '003 / XP Investimentos' },
        { value: '002', label: '114 / Itaú Corretora' },
        { value: '003', label: '308 / Clear Corretora' },
        { value: '004', label: '411 / Rico Investimentos' },
        { value: '005', label: '999 / Nova Corretora' },
        { value: '006', label: '123 / Outra Corretora' },
    ];

    const tiposFixos = [
        { value: 'Intermediário full', label: 'Intermediário full' },
        { value: 'Intermediário light', label: 'Intermediário light' },
        { value: 'Participante de Liquidação', label: 'Participante de Liquidação' },
        { value: 'Formador de mercado', label: 'Formador de mercado' },
    ];

    const ambientes = [
        { value: 'Certificação', label: 'Certificação' },
        { value: 'Produção', label: 'Produção' },
    ];

    const fechar = () => {
        setStep(1);
        setParticipantCode(null);
        setParticipationType(null);
        onFinalizar();
    };

    const salvarConfiguracao = (ambienteSelecionado: any) => {
        console.log('Redirecionar com filtros:', {
            participantCode,
            participationType,
            environmentType: ambienteSelecionado,
        });

        fechar();
    };

    const containerStyle: React.CSSProperties = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '390px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '6px',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        color: 'white',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 9999,
        maxHeight: '420px',
    };

    const headerStyle: React.CSSProperties = {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        width: '100%',
        height: '72px',
        padding: '8px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    };

    const logoStyle: React.CSSProperties = {
        width: 28,
        height: 28,
        borderRadius: '50%',
        objectFit: 'cover',
    };

    const titleContainerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    };

    const titleStyle: React.CSSProperties = {
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '20px',
        color: 'rgba(0, 0, 0, 1)',
        fontFamily: 'Arial, sans-serif',
    };

    const subtitleStyle: React.CSSProperties = {
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '20px',
        color: 'rgba(0, 0, 0, 0.6)',
        marginTop: '2px',
        fontFamily: 'Arial, sans-serif',
    };

    const optionTextStyle: React.CSSProperties = {
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '24px',
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: 'Arial, sans-serif',
    };

    const contentStyle: React.CSSProperties = {
        flex: 1,
        padding: '8px 12px',
        overflowY: 'auto',
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(255, 255, 255, 0.1) transparent',
        background: 'var(--neutral-colors-neutral-30, rgba(255, 255, 255, 0.3))',
    };

    return (
        <div>
            {step === 1 && (
                <div style={containerStyle}>
                    <div style={headerStyle}>
                        <img
                            src="/logoa5x.png"
                            alt="Logo"
                            style={logoStyle}
                        />
                        <div style={titleContainerStyle}>
                            <div style={titleStyle}>Selecionar Instituição</div>
                            <div style={subtitleStyle}>Tipo Participação</div>
                        </div>
                    </div>
                    <div
                        style={{
                            ...contentStyle,
                            maxHeight: '187px',
                            overflowY: 'auto',
                        }}
                    >
                        {participantes.map((option) => (
                            <div
                                key={option.value}
                                onClick={() => {
                                    setParticipantCode(option);
                                    setStep(2);
                                }}
                                style={{
                                    padding: '10px 0',
                                    borderBottom: '1px dashed rgba(255, 255, 255, 0.3)',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    ...optionTextStyle,
                                }}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {step === 2 && participantCode && (
                <div style={containerStyle}>
                    <div style={headerStyle}>
                        <img
                            src="/corretora.png"
                            alt="Logo"
                            style={logoStyle}
                        />
                        <div style={titleContainerStyle}>
                            <div style={titleStyle}>{participantCode.label}</div>
                            <div style={subtitleStyle}>Tipo Participação</div>
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            maxHeight: '160px',
                            background: 'var(--neutral-colors-neutral-30, rgba(255, 255, 255, 0.3))',
                        }}
                    >
                        <div
                            onClick={() => setStep(1)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                paddingLeft: 8,
                                paddingRight: 8,
                                cursor: 'pointer',
                                color: 'rgba(255, 255, 255, 1)',
                                userSelect: 'none',
                            }}
                        >
                            <ArrowLeft size={28} />
                        </div>
                        <div
                            style={{
                                flex: 1,
                                overflowY: 'auto',
                                maxHeight: '160px',
                                scrollbarWidth: 'thin',
                                scrollbarColor: 'rgba(255, 255, 255, 0.1) transparent',
                            }}
                        >
                            {tiposFixos.map((option) => (
                                <div
                                    key={option.value}
                                    onClick={() => {
                                        setParticipationType(option);
                                        setStep(3);
                                    }}
                                    style={{
                                        padding: '10px 0',
                                        borderBottom: '1px dashed rgba(255, 255, 255, 0.3)',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        ...optionTextStyle,
                                    }}
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {step === 3 && participantCode && participationType && (
                <div style={containerStyle}>
                    <div style={headerStyle}>
                        <img
                            src="/corretora.png"
                            alt="Logo"
                            style={logoStyle}
                        />
                        <div style={titleContainerStyle}>
                            <div style={titleStyle}>{participantCode.label}</div>
                            <div style={subtitleStyle}>{participationType.label}</div>
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            maxHeight: '160px',
                            background: 'var(--neutral-colors-neutral-30, rgba(255, 255, 255, 0.3))',
                        }}
                    >
                        <div
                            onClick={() => setStep(2)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                paddingLeft: 8,
                                paddingRight: 8,
                                cursor: 'pointer',
                                color: 'rgba(255, 255, 255, 1)',
                                userSelect: 'none',
                            }}
                        >
                            <ArrowLeft size={28} />
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto', maxHeight: '160px' }}>
                            {ambientes.map((option) => (
                                <div
                                    key={option.value}
                                    onClick={() => salvarConfiguracao(option)}
                                    style={{
                                        padding: '10px 0',
                                        borderBottom: '1px dashed rgba(255, 255, 255, 0.3)',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        ...optionTextStyle,
                                    }}
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModaisSelecao;
