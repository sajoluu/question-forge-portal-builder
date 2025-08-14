import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Plus, Pencil, Trash2, Search, ChevronDown } from "lucide-react";

interface ActionSet { view: boolean; create: boolean; edit: boolean; delete: boolean; export?: boolean }
interface Submenu { id: string; name: string; path: string; actions: ActionSet }
interface MenuItem { id: string; name: string; icon?: string; path: string; actions: ActionSet; submenus?: Submenu[] }

const initialMenus: MenuItem[] = [
  {
    id: "m1",
    name: "Dashboard",
    icon: "LayoutDashboard",
    path: "/",
    actions: { view: true, create: false, edit: false, delete: false, export: false },
    submenus: []
  },
  {
    id: "m2",
    name: "Training",
    icon: "GraduationCap",
    path: "/training",
    actions: { view: true, create: true, edit: true, delete: false, export: true },
    submenus: [
      { id: "sm1", name: "Courses", path: "/training/courses", actions: { view: true, create: true, edit: true, delete: false, export: true } },
      { id: "sm2", name: "Sessions", path: "/training/sessions", actions: { view: true, create: true, edit: false, delete: false, export: false } },
    ]
  },
];

export default function MenuList() {
  const [menus, setMenus] = useState<MenuItem[]>(initialMenus);
  const [q, setQ] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [deleting, setDeleting] = useState<MenuItem | null>(null);

  const filtered = useMemo(() => menus.filter(m =>
    m.name.toLowerCase().includes(q.toLowerCase()) || m.path.toLowerCase().includes(q.toLowerCase())
  ), [menus, q]);

  const toggle = (id: string) => setExpanded((e) => ({ ...e, [id]: !e[id] }));

  const actionKeys: (keyof ActionSet)[] = ["view","create","edit","delete","export"];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Menu Management</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search menus or paths" className="pl-8 w-64" />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="shadow-glow"><Plus className="h-4 w-4 mr-2" />Add Menu</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Create Menu</DialogTitle></DialogHeader>
              <MenuForm onSubmit={(m)=>setMenus((prev)=>[...prev,{...m,id:String(Date.now())}])} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Menu List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Menu / Submenu</TableHead>
                {actionKeys.map(k=> (<TableHead key={k} className="capitalize">{k}</TableHead>))}
                <TableHead>Path</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((menu)=> (
                <>
                  <TableRow key={menu.id}>
                    <TableCell className="font-medium">
                      <button className="inline-flex items-center gap-1 text-sm hover:underline" onClick={()=>toggle(menu.id)}>
                        <ChevronDown className={`h-4 w-4 transition-transform ${expanded[menu.id] ? 'rotate-180' : ''}`} />
                        {menu.name}
                        {menu.submenus && menu.submenus.length>0 && (
                          <Badge variant="secondary" className="ml-2">{menu.submenus.length} sub</Badge>
                        )}
                      </button>
                    </TableCell>
                    {actionKeys.map((k)=> (
                      <TableCell key={String(k)}>
                        <Checkbox checked={!!menu.actions[k]} onCheckedChange={(v)=>{
                          setMenus(prev=> prev.map(m=> m.id===menu.id ? { ...m, actions: { ...m.actions, [k]: !!v } } : m));
                        }} />
                      </TableCell>
                    ))}
                    <TableCell className="font-mono text-xs">{menu.path}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={()=>setEditing(menu)}><Pencil className="h-4 w-4 mr-2"/> Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={()=>setDeleting(menu)} className="text-destructive"><Trash2 className="h-4 w-4 mr-2"/> Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>

                  {expanded[menu.id] && menu.submenus?.map((sm)=> (
                    <TableRow key={sm.id}>
                      <TableCell className="pl-8">— {sm.name}</TableCell>
                      {actionKeys.map((k)=> (
                        <TableCell key={String(k)}>
                          <Checkbox checked={!!sm.actions[k]} onCheckedChange={(v)=>{
                            setMenus(prev=> prev.map(m=> m.id!==menu.id ? m : ({
                              ...m, submenus: m.submenus?.map(s=> s.id!==sm.id ? s : ({...s, actions: { ...s.actions, [k]: !!v }}))
                            })));
                          }} />
                        </TableCell>
                      ))}
                      <TableCell className="font-mono text-xs">{sm.path}</TableCell>
                      <TableCell className="text-right"></TableCell>
                    </TableRow>
                  ))}
                </>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit */}
      <Dialog open={!!editing} onOpenChange={(o)=>!o && setEditing(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Menu</DialogTitle></DialogHeader>
          {editing && (
            <MenuForm
              defaultValue={editing}
              onSubmit={(m)=>{
                setMenus(prev=> prev.map(x=> x.id===editing.id ? { ...editing, ...m } : x));
                setEditing(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete */}
      <Dialog open={!!deleting} onOpenChange={(o)=>!o && setDeleting(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Delete Menu</DialogTitle></DialogHeader>
          <p>Are you sure you want to delete “{deleting?.name}”? This will also remove its submenus.</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={()=>setDeleting(null)}>Cancel</Button>
            <Button variant="destructive" onClick={()=>{ setMenus(prev=> prev.filter(x=> x.id!==deleting?.id)); setDeleting(null); }}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function MenuForm({ defaultValue, onSubmit }: {
  defaultValue?: MenuItem;
  onSubmit: (val: Omit<MenuItem,'id'|'submenus'> & { submenus?: Submenu[] }) => void;
}) {
  const [name, setName] = useState(defaultValue?.name ?? "");
  const [icon, setIcon] = useState(defaultValue?.icon ?? "");
  const [path, setPath] = useState(defaultValue?.path ?? "");
  const [actions, setActions] = useState<ActionSet>(defaultValue?.actions ?? { view: true, create: false, edit: false, delete: false, export: false });
  const [submenus, setSubmenus] = useState<Submenu[]>(defaultValue?.submenus ?? []);

  const addSub = () => setSubmenus(prev => [...prev, { id: String(Date.now()+Math.random()), name: "", path: "", actions: { view:true, create:false, edit:false, delete:false, export:false } }]);
  const actionKeys: (keyof ActionSet)[] = ["view","create","edit","delete","export"];

  return (
    <form
      className="space-y-4"
      onSubmit={(e)=>{ e.preventDefault(); if(!name.trim() || !path.trim()) return; onSubmit({ name, icon, path, actions, submenus }); }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Menu Name</label>
          <Input value={name} onChange={(e)=>setName(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Icon (optional)</label>
          <Input value={icon} onChange={(e)=>setIcon(e.target.value)} placeholder="e.g., LayoutDashboard" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Path</label>
          <Input value={path} onChange={(e)=>setPath(e.target.value)} placeholder="/reports" required />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Actions</label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {actionKeys.map(k=> (
            <label key={k} className="inline-flex items-center gap-2 capitalize">
              <Checkbox checked={!!actions[k]} onCheckedChange={(v)=> setActions(a=> ({...a, [k]: !!v}))} /> {k}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Submenus</h4>
          <Button type="button" variant="outline" onClick={addSub}><Plus className="h-4 w-4 mr-2"/> Add Submenu</Button>
        </div>
        <div className="space-y-4">
          {submenus.map((sm, idx)=> (
            <div key={sm.id} className="rounded-lg border p-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input value={sm.name} onChange={(e)=> setSubmenus(s=> s.map((x,i)=> i===idx ? { ...x, name: e.target.value } : x))} placeholder="Submenu name" />
                <Input value={sm.path} onChange={(e)=> setSubmenus(s=> s.map((x,i)=> i===idx ? { ...x, path: e.target.value } : x))} placeholder="/path" />
                <Button type="button" variant="destructive" onClick={()=> setSubmenus(s=> s.filter((_,i)=>i!==idx))}><Trash2 className="h-4 w-4 mr-2"/>Remove</Button>
              </div>
              <div className="mt-3 grid grid-cols-2 md:grid-cols-5 gap-2">
                {actionKeys.map(k=> (
                  <label key={k} className="inline-flex items-center gap-2 capitalize">
                    <Checkbox checked={!!sm.actions[k]} onCheckedChange={(v)=> setSubmenus(s=> s.map((x,i)=> i===idx ? { ...x, actions: { ...x.actions, [k]: !!v } } : x))} /> {k}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline">Cancel</Button>
        <Button type="submit" className="shadow-glow">Save</Button>
      </div>
    </form>
  );
}
