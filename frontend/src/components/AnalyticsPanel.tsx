import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3 } from "lucide-react";
import { Analytics } from "@/types/booking";

export const AnalyticsPanel = () => {
  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  });
  const [analyticsData, setAnalyticsData] = useState<Analytics[] | null>(null);

  const analyticsMutation = useMutation({
    mutationFn: ({ from, to }: { from: string; to: string }) => api.getAnalytics(from, to),
    onSuccess: (data) => {
      setAnalyticsData(data);
    },
  });

  const handleFetchAnalytics = (e: React.FormEvent) => {
    e.preventDefault();
    if (dateRange.from && dateRange.to) {
      analyticsMutation.mutate(dateRange);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Revenue Analytics
          </CardTitle>
          <CardDescription>View booking statistics by date range</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFetchAnalytics} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="from">From Date</Label>
                <Input
                  id="from"
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="to">To Date</Label>
                <Input
                  id="to"
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                  required
                />
              </div>
            </div>
            <Button type="submit" disabled={analyticsMutation.isPending}>
              {analyticsMutation.isPending ? "Loading..." : "Fetch Analytics"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {analyticsData && (
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            {analyticsData.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">No data for selected period</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Room ID</TableHead>
                      <TableHead>Room Name</TableHead>
                      <TableHead>Total Hours</TableHead>
                      <TableHead>Total Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analyticsData.map((item) => (
                      <TableRow key={item.roomId}>
                        <TableCell className="font-mono">{item.roomId}</TableCell>
                        <TableCell className="font-medium">{item.roomName}</TableCell>
                        <TableCell>{item.totalHours.toFixed(1)} hrs</TableCell>
                        <TableCell className="font-semibold text-success">₹{item.totalRevenue}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="font-bold bg-muted/50">
                      <TableCell colSpan={2}>Total</TableCell>
                      <TableCell>
                        {analyticsData.reduce((sum, item) => sum + item.totalHours, 0).toFixed(1)} hrs
                      </TableCell>
                      <TableCell className="text-success">
                        ₹{analyticsData.reduce((sum, item) => sum + item.totalRevenue, 0)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
