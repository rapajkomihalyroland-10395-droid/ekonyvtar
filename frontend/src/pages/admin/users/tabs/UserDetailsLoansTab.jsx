import React from "react";

const UserDetailsLoansTab = ({ currentLoanPage, previousPage, nextPage }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-foreground">
          Aktív kölcsönzések
        </h3>
      </div>

      <div className="overflow-hidden rounded-lg border border-border">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Könyv címe
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Kölcsönzés dátuma
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Határidő
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Státusz
              </th>
            </tr>
          </thead>
          <tbody className="bg-background divide-y divide-border">
            {currentLoanPage.map((loan) => (
              <tr key={loan.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-foreground">
                  {loan.konyv}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {new Date(loan.berles_kezdete).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {new Date(loan.berles_vege).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      !loan.visszahozva
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {!loan.visszahozva ? "Aktív kölcsönzés" : "Visszahozva"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between gap-3 p-4 border-t border-border bg-muted/20">
          <button
            type="button"
            onClick={previousPage}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
          >
            Előző
          </button>
          <button
            type="button"
            onClick={nextPage}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
          >
            Következő
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsLoansTab;
