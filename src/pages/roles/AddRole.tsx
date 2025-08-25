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
    <div className="space-y-6 animate-fade-in bg-gradient-to-br from-guardey-dark/5 to-guardey-teal/5 p-6 rounded-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-guardey-dark">Add Role</h1>
      </div>

      <Card className="border-guardey-teal/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-guardey-dark">Role Details</CardTitle>
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
              <label className="block text-sm font-medium mb-1 text-guardey-dark">Role Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-guardey-dark">Access Level</label>
              <Input type="number" min={1} max={6} value={accessLevel} onChange={(e) => setAccessLevel(Number(e.target.value))} required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-guardey-dark">Description</label>
              <Input value={description} onChange={(e) => setDescription(e.target.value)} maxLength={255} />
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
              <Button variant="outline" type="button" onClick={() => navigate(-1)} className="border-guardey-teal text-guardey-teal hover:bg-guardey-teal hover:text-white">Cancel</Button>
              <Button type="submit" className="bg-guardey-lime text-guardey-lime-foreground hover:bg-guardey-lime/90 shadow-glow">Create Role</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
