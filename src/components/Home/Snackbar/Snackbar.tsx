import { Alert } from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import { getSnackBar, type SnackBarItem } from "../../../services/snackbarService";

export function SnackBarAlert() {
  const [snackBars, setSnackBars] = useState<SnackBarItem[]>([]);
  const { token, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading || !token) return;

    const fetchBanners = async () => {
      try {
        const response = await getSnackBar();
        setSnackBars(response);
      } catch (error) {
        setSnackBars([]);
      }
    };

    fetchBanners();
  }, [isLoading, token]);

  return (
    <div className="space-y-4">
      {snackBars.map((snack) => (
        <Alert
          key={snack.id}
          statusIconAriaLabel={snack.type}
          type={snack.type as "info" | "success" | "warning" | "error"}
          dismissible={false}
        >
          <div className="flex items-center justify-between space-x-3">
           <div className="flex flex-col">
             {snack.title && 
             <span className="font-bold">{snack.title}</span>
            }
            <span>{snack.message}</span>
           </div>

            {
             snack.labelbutton && snack.url ? (
              <div className="flex justify-center">
                 <a
                href={snack.url}
                className="relative  border px-3 py-1.5 rounded-full text-sm font-medium transition border-primary-1 text-primary-1 hover:bg-primary-1 hover:text-white"
              >
                {snack.labelbutton}
              </a>
              </div>
            ) : null
            }
          </div>
        </Alert>
      ))}
    </div>
  );
}
