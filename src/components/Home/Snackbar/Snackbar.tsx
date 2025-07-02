import { Alert } from "@cloudscape-design/components";

interface SnackBarAlertProps {
  title: string;
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
  type?: "info" | "success" | "warning" | "error";
}

export function SnackBarAlert({
  title,
  message,
  buttonText,
  onButtonClick,
  type = "info",
}: SnackBarAlertProps) {
  return (
    <Alert
      statusIconAriaLabel={type}
      type={type}
      header={title}
      dismissible={false}
      action={
        buttonText && onButtonClick ? (
          <button
            onClick={onButtonClick}
            className="border px-3 py-1.5 rounded-full text-sm font-medium transition border-primary-1 text-primary-1">
            {buttonText}
          </button>
        ) : null
      }
    >
      <div className="flex items-center space-x-3">
        <span>{message}</span>
      </div>
    </Alert>
  );
}
