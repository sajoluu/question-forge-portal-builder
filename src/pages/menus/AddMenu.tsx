import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ActionSet { view: boolean; create: boolean; edit: boolean; delete: boolean; export?: boolean }
interface Submenu { id: string; name: string; path: string; actions: ActionSet }

export default function AddMenu() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [path, setPath] = useState("");
  const [actions, setActions] = useState<ActionSet>({ view: true, create: false, edit: false, delete: false, export: false });
  const [subs, setSubs] = useState<Submenu[]>([]);
  const actionKeys: (keyof ActionSet)[] = ["view","create","edit","delete","export"];

  const addSub = () => setSubs(prev => [...prev, { id: String(Date.now()+Math.random()), name: "", path: "", actions: { view:true, create:false, edit:false, delete:false, export:false } }]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Create New Menu</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Menu Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-6"
            onSubmit={(e)=>{ e.preventDefault(); if(!name.trim() || !path.trim()) return; navigate("/menus"); }}
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
                {subs.map((sm, idx)=> (
                  <div key={sm.id} className="rounded-lg border p-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Input value={sm.name} onChange={(e)=> setSubs(s=> s.map((x,i)=> i===idx ? { ...x, name: e.target.value } : x))} placeholder="Submenu name" />
                      <Input value={sm.path} onChange={(e)=> setSubs(s=> s.map((x,i)=> i===idx ? { ...x, path: e.target.value } : x))} placeholder="/path" />
                      <Button type="button" variant="destructive" onClick={()=> setSubs(s=> s.filter((_,i)=>i!==idx))}><Trash2 className="h-4 w-4 mr-2"/>Remove</Button>
                    </div>
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-5 gap-2">
                      {actionKeys.map(k=> (
                        <label key={k} className="inline-flex items-center gap-2 capitalize">
                          <Checkbox checked={!!sm.actions[k]} onCheckedChange={(v)=> setSubs(s=> s.map((x,i)=> i===idx ? { ...x, actions: { ...x.actions, [k]: !!v } } : x))} /> {k}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={()=>navigate(-1)}>Cancel</Button>
              <Button type="submit" className="shadow-glow">Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
