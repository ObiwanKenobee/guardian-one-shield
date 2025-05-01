
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle, Bell, ChevronRight, Clock, Edit, MapPin, MoreHorizontal, Trash2 } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert } from "@/hooks/useAlerts";

interface AlertsTableProps {
  alerts: Alert[];
  onEdit: (alert: Alert) => void;
  onDelete: (alert: Alert) => void;
  onViewDetails: (alert: Alert) => void;
}

export function AlertsTable({ alerts, onEdit, onDelete, onViewDetails }: AlertsTableProps) {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case "critical":
        return "bg-guardian-accent text-white";
      case "high":
        return "bg-guardian-warning text-white";
      case "medium":
        return "bg-amber-500 text-white";
      case "low":
        return "bg-guardian-primary text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "active":
        return "bg-guardian-accent/15 text-guardian-accent border-guardian-accent/30";
      case "investigating":
        return "bg-guardian-warning/15 text-guardian-warning border-guardian-warning/30";
      case "resolved":
        return "bg-guardian-success/15 text-guardian-success border-guardian-success/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleDeleteClick = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedAlert) {
      onDelete(selectedAlert);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <Table className="border rounded-md">
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-1/3">Title & Location</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-32 text-center">Risk Level</TableHead>
            <TableHead className="w-32 text-center">Status</TableHead>
            <TableHead className="w-40 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alerts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No alerts found
              </TableCell>
            </TableRow>
          ) : (
            alerts.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell>
                  <div className="font-medium">{alert.title}</div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{typeof alert.location === 'string' ? alert.location : `${alert.location.lat.toFixed(2)}, ${alert.location.lng.toFixed(2)}`}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3" />
                    <span>
                      {new Date(alert.created_at).toLocaleString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm line-clamp-2">
                    {alert.description}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge className={`${getSeverityColor(alert.risk_level)}`}>
                    {alert.risk_level.charAt(0).toUpperCase() + alert.risk_level.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className={getStatusColor(alert.status)}>
                    {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onViewDetails(alert)}>
                        <ChevronRight className="h-4 w-4 mr-2" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(alert)}>
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDeleteClick(alert)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this alert? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete Alert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
