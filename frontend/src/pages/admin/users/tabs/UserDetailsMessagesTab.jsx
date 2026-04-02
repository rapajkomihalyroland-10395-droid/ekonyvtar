import React from "react";
import { Send } from "lucide-react";

const UserDetailsMessagesTab = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h3 className="text-sm font-medium mb-2">Új üzenet küldése</h3>
        <textarea
          className="flex min-h-[100px] w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mb-4"
          placeholder="Írja be az üzenetét..."
        />
        <div className="flex justify-end">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Send size={16} className="mr-2" />
            Küldés
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Előzmények</h3>
        <div className="text-center py-8 text-gray-500">
          Nincsenek korábbi üzenetek.
        </div>
      </div>
    </div>
  );
};

export default UserDetailsMessagesTab;
