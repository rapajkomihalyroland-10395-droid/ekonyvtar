import React from "react";
import { Eye, Edit2, Trash2, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../../components/StatusBadge.jsx";

const UserListTable = ({ users, isLoading }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Betöltés...</div>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
          <tr>
            <th className="px-6 py-4">Név / Email</th>
            <th className="px-6 py-4">Szerepkör</th>
            <th className="px-6 py-4 text-center">Aktív kölcsönzések</th>
            <th className="px-6 py-4 text-right">Műveletek</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div>
                  <div className="font-medium text-gray-900">{user.nev}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {user.email}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={user.szerepkor} />
              </td>
              <td className="px-6 py-4 text-center">
                <span
                  className={
                    user.aktiv_kolcsonzes ?
                      "font-medium text-gray-900"
                    : "text-gray-400"
                  }
                >
                  {user.aktiv_kolcsonzes ? "van aktív kölcsönzése" : "nincsen"}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => navigate(`/admin/users/${user.id}`)}
                    className="p-1.5 text-gray-500 hover:text-primary hover:bg-primary/10 rounded transition-colors"
                    title="Megtekintés"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && (
        <div className="p-12 text-center">
          <p className="text-gray-500">Nincs megjeleníthető felhasználó.</p>
        </div>
      )}
    </div>
  );
};

export default UserListTable;
