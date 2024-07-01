import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { api } from "@/lib/api";

function App() {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    async function fetchTotalSpent() {
      const response = await api.expenses["total-spent"].$get();
      const data = await response.json();
      setTotalSpent(data.total);
    }
    fetchTotalSpent();
  }, []);

  return (
    <>
      <Card className="max-w-md mx-auto shadow-lg rounded-lg p-6 bg-gray-100">
        <CardHeader>
          <CardTitle className="text-3xl text-center text-blue-600">
            Total Spent
          </CardTitle>
          <CardDescription className="text-center text-gray-500">
            Total amount spent
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
          <span className="text-4xl font-extrabold text-green-500">
            ${totalSpent}
          </span>
        </CardContent>
      </Card>
    </>
  );
}

export default App;
