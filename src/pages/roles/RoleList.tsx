import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Plus, Pencil, Trash2, Search } from "lucide-react";

interface Role {
  id: string;
  name: string;
  description?: string;
  accessLevel: number;
  color: string;
}

const initialRoles: Role[] = [
  { id: "1", name: "Super Admin", description: "Full platform access", accessLevel: 6, color: "indigo" },
  { id: "2", name: "Aspire Admin", description: "Manage tenants and roles", accessLevel: 5, color: "cyan" },
  { id: "3", name: "Client Admin", description: "Client-wide settings", accessLevel: 4, color: "emerald" },
];

export default function RoleList() {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Role | null>(null);
  const [deleting, setDeleting] = useState<Role | null>(null);

  const filtered = roles.filter(r =>
    r.name.toLowerCase().includes(query.toLowerCase()) ||
    String(r.accessLevel).includes(query)
  );

  return (
    <div className="space-y-6 animate-fade-in bg-gradient-to-br from-guardey-dark/5 to-guardey-teal/5 p-6 rounded-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-guardey-dark">Role Management</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-guardey-teal" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or access level"
              className="pl-8 w-64"
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-guardey-lime text-guardey-lime-foreground hover:bg-guardey-lime/90 shadow-glow"><Plus className="h-4 w-4 mr-2" />Add Role</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Role</DialogTitle>
              </DialogHeader>
              <AddOrEditRoleForm onSubmit={(r) => setRoles((prev) => [...prev, { ...r, id: String(Date.now()) }])} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="border-guardey-teal/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-guardey-dark">Role List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Access Level</TableHead>
                <TableHead>Color Theme</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>{role.accessLevel}</TableCell>
                  <TableCell>
                    <span className={`inline-flex h-5 w-5 rounded-full ${
                      role.color === 'indigo' ? 'bg-guardey-purple' :
                      role.color === 'cyan' ? 'bg-guardey-teal' :
                      role.color === 'emerald' ? 'bg-guardey-lime' :
                      'bg-guardey-dark'
                    }`} aria-hidden />
                    <span className="sr-only">{role.color}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditing(role)}>
                          <Pencil className="h-4 w-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDeleting(role)} className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
          </DialogHeader>
          {editing && (
            <AddOrEditRoleForm
              defaultValue={editing}
              onSubmit={(updated) => {
                setRoles((prev) => prev.map((r) => (r.id === editing.id ? { ...r, ...updated } : r)));
                setEditing(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={!!deleting} onOpenChange={(o) => !o && setDeleting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Role</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete the role "{deleting?.name}"? This action cannot be undone.</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeleting(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => {
              setRoles((prev) => prev.filter((r) => r.id !== deleting?.id));
              setDeleting(null);
            }}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AddOrEditRoleForm({ defaultValue, onSubmit }: {
  defaultValue?: Role;
  onSubmit: (role: Omit<Role, "id">) => void;
}) {
  const [name, setName] = useState(defaultValue?.name ?? "");
  const [description, setDescription] = useState(defaultValue?.description ?? "");
  const [accessLevel, setAccessLevel] = useState<number>(defaultValue?.accessLevel ?? 1);
  const [color, setColor] = useState(defaultValue?.color ?? "indigo");

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onSubmit({ name, description, accessLevel, color });
      }}
    >
      <div>
        <label className="block text-sm font-medium mb-1 text-guardey-dark">Role Name</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Client Admin" required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-guardey-dark">Access Level</label>
        <Input type="number" min={1} max={6} value={accessLevel} onChange={(e) => setAccessLevel(Number(e.target.value))} required />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1 text-guardey-dark">Description</label>
        <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Responsibilities and scope" />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1 text-guardey-dark">Color Theme</label>
        <div className="flex gap-3 flex-wrap">
          {['guardey-dark','guardey-lime','guardey-teal','guardey-purple','primary','secondary'].map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => setColor(c)}
              className={`h-9 px-4 rounded-md border border-guardey-teal/30 hover:border-guardey-lime transition-colors ${color===c ? 'ring-2 ring-guardey-lime bg-guardey-lime/10' : 'bg-white hover:bg-guardey-lime/5'}`}
            >
              <span className={`inline-block h-4 w-4 rounded-full mr-2 ${
                c === 'guardey-dark' ? 'bg-guardey-dark' :
                c === 'guardey-lime' ? 'bg-guardey-lime' :
                c === 'guardey-teal' ? 'bg-guardey-teal' :
                c === 'guardey-purple' ? 'bg-guardey-purple' :
                c === 'primary' ? 'bg-primary' : 'bg-secondary'
              }`} />
              <span className="text-guardey-dark capitalize">{c.replace('guardey-', '')}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="md:col-span-2 flex justify-end gap-2">
        <Button variant="outline" type="button" className="border-guardey-teal text-guardey-teal hover:bg-guardey-teal hover:text-white">Cancel</Button>
        <Button type="submit" className="bg-guardey-lime text-guardey-lime-foreground hover:bg-guardey-lime/90 shadow-glow">{defaultValue ? 'Save' : 'Create Role'}</Button>
      </div>
    </form>
  );
}
