import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Trash2, BookOpen, History, Plus } from "lucide-react";
import StatusBadge from "../components/StatusBadge.jsx";
import { cn } from "../../../utils/cn";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");

  
  const book = {
    id: 1,
    title: "Harry Potter és a Bölcsek Köve",
    author: "J.K. Rowling",
    isbn: "9789638386894",
    publisher: "Animus Kiadó",
    year: "2000",
    category: "Fantasy",
    description: "A Harry Potter-sorozat első kötete...",
    copies: 5,
    location: "A3-12",
    status: "active",
  };

  const loans = [
    {
      id: 101,
      user: "Kiss Péter",
      date: "2024.01.10",
      deadline: "2024.01.24",
      returned: null,
      status: "active",
    },
    {
      id: 102,
      user: "Nagy Anna",
      date: "2023.12.01",
      deadline: "2023.12.15",
      returned: "2023.12.14",
      status: "closed",
    },
  ];

  return (
    <div className="space-y-6">
      {}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/books")}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{book.title}</h1>
          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
            <span>{book.author}</span>
            <span>•</span>
            <span className="font-mono">{book.isbn}</span>
            <StatusBadge status={book.status} />
          </div>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
            <Trash2 size={16} className="mr-2" />
            Törlés
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Save size={16} className="mr-2" />
            Mentés
          </button>
        </div>
      </div>

      {}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("details")}
            className={cn(
              "py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2",
              activeTab === "details"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
          >
            <BookOpen size={16} />
            Alapadatok
          </button>
          <button
            onClick={() => setActiveTab("loans")}
            className={cn(
              "py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2",
              activeTab === "loans"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
          >
            <History size={16} />
            Kölcsönzések
          </button>
        </nav>
      </div>

      {}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {activeTab === "details" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                  Cím
                </label>
                <input
                  type="text"
                  defaultValue={book.title}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                  Szerző
                </label>
                <input
                  type="text"
                  defaultValue={book.author}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                  ISBN
                </label>
                <input
                  type="text"
                  defaultValue={book.isbn}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                    Kiadó
                  </label>
                  <input
                    type="text"
                    defaultValue={book.publisher}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                    Kiadás éve
                  </label>
                  <input
                    type="text"
                    defaultValue={book.year}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Leírás</label>
                <textarea
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  defaultValue={book.description}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                    Példányszám
                  </label>
                  <input
                    type="number"
                    defaultValue={book.copies}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                    Polc / Hely
                  </label>
                  <input
                    type="text"
                    defaultValue={book.location}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "loans" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Kölcsönzési előzmények</h3>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3 bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus size={16} className="mr-2" />
                Új kölcsönzés
              </button>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Felhasználó
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kölcsönzés dátuma
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Határidő
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Visszahozva
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Státusz
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loans.map((loan) => (
                    <tr key={loan.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {loan.user}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {loan.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {loan.deadline}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {loan.returned || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={cn(
                            "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                            loan.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          )}
                        >
                          {loan.status === "active" ? "Aktív" : "Lezárt"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
