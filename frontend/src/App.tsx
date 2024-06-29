import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

function App() {
  const [totalSpent, setTotalSpent] = useState(0);
  return (
    <Card className="w-[350px] mx-auto">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>Total amount spent</CardDescription>
      </CardHeader>
      <CardContent>
        <span className="text-2xl font-bold">${totalSpent}</span>
      </CardContent>
    </Card>
  );
}

export default App;
