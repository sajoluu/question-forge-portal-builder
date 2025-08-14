import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function AddRole() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [accessLevel, setAccessLevel] = useState<number>(1);
  const [color, setColor] = useState("indigo");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Add Role</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Role Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!name.trim()) return;
              // Simulate save then navigate
              navigate("/roles");
            }}
          >
            <div>
              <label className="block text-sm font-medium mb-1">Role Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Access Level</label>
              <Input type="number" min={1} max={6} value={accessLevel} onChange={(e) => setAccessLevel(Number(e.target.value))} required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <Input value={description} onChange={(e) => setDescription(e.target.value)} maxLength={255} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Color Theme</label>
              <div className="flex gap-3 flex-wrap">
                {['indigo','cyan','emerald','rose','amber','violet'].map((c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => setColor(c)}
                    className={`h-9 px-4 rounded-md border hover-scale ${color===c ? 'ring-2 ring-primary' : ''}`}
                    style={{ background: `hsl(var(--primary) / 0.05)` }}
                  >
                    <span className={`inline-block h-4 w-4 rounded-full mr-2 bg-${c}-500`} />
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-2 flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={() => navigate(-1)}>Cancel</Button>
              <Button type="submit" className="shadow-glow">Create Role</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
