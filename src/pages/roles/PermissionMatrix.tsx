import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

interface ActionSet { view: boolean; create: boolean; edit: boolean; delete: boolean }
interface SubmenuPerm { name: string; actions: ActionSet }
interface MenuPerm { name: string; actions: ActionSet; submenus?: SubmenuPerm[] }

const seed: MenuPerm[] = [
  { name: "Dashboard", actions: { view: true, create: false, edit: false, delete: false } },
  { name: "Training", actions: { view: true, create: true, edit: true, delete: false }, submenus: [
    { name: "Courses", actions: { view: true, create: true, edit: true, delete: false } },
    { name: "Sessions", actions: { view: true, create: true, edit: false, delete: false } },
  ]},
  { name: "User Management", actions: { view: true, create: true, edit: true, delete: true }, submenus: [
    { name: "Users", actions: { view: true, create: true, edit: true, delete: true } },
    { name: "Roles", actions: { view: true, create: true, edit: true, delete: true } },
  ]},
];

export default function PermissionMatrix() {
  const [perms, setPerms] = useState<MenuPerm[]>(seed);

  const toggle = (path: number[], key: keyof ActionSet) => {
    setPerms((prev) => {
      const clone = structuredClone(prev) as MenuPerm[];
      let node: any = clone;
      for (let i = 0; i < path.length - 1; i++) node = node[path[i]];
      const last = path[path.length - 1];
      node[last].actions[key] = !node[last].actions[key];
      return clone;
    });
  };

  const allChecked = useMemo(() => JSON.stringify(perms), [perms]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Role Permission Matrix</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setPerms(seed)}>Reset</Button>
          <Button className="shadow-glow" onClick={() => toast.success("Permissions saved successfully")}>Save</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Menus and Submenus</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Menu / Submenu</TableHead>
                <TableHead>View</TableHead>
                <TableHead>Create</TableHead>
                <TableHead>Edit</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {perms.map((menu, mi) => (
                <>
                  <TableRow key={menu.name}>
                    <TableCell className="font-medium">{menu.name}</TableCell>
                    {(['view','create','edit','delete'] as (keyof ActionSet)[]).map((k) => (
                      <TableCell key={k}>
                        <Checkbox checked={menu.actions[k]} onCheckedChange={() => toggle([mi], k)} />
                      </TableCell>
                    ))}
                  </TableRow>
                  {menu.submenus?.map((sub, si) => (
                    <TableRow key={`${menu.name}-${sub.name}`}>
                      <TableCell className="pl-8">— {sub.name}</TableCell>
                      {(['view','create','edit','delete'] as (keyof ActionSet)[]).map((k) => (
                        <TableCell key={k}>
                          <Checkbox checked={sub.actions[k]} onCheckedChange={() => toggle([mi, 'submenus' as any, si], k)} />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">Checksum: {allChecked.length}</p>
    </div>
  );
}
