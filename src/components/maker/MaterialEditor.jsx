import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MaterialEditor({ materials = [], onChange }) {
  const add = () => onChange([...materials, { name: "", quantity: "", category: "material", notes: "" }]);
  const remove = (i) => onChange(materials.filter((_, idx) => idx !== i));
  const update = (i, field, value) => {
    const updated = [...materials];
    updated[i] = { ...updated[i], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {materials.map((mat, i) => (
        <div key={i} className="grid grid-cols-12 gap-2 items-start">
          <div className="col-span-4">
            <Input
              value={mat.name}
              onChange={e => update(i, "name", e.target.value)}
              placeholder="Item name"
              className="rounded-xl text-sm"
            />
          </div>
          <div className="col-span-2">
            <Input
              value={mat.quantity}
              onChange={e => update(i, "quantity", e.target.value)}
              placeholder="Qty"
              className="rounded-xl text-sm"
            />
          </div>
          <div className="col-span-3">
            <Select value={mat.category} onValueChange={v => update(i, "category", v)}>
              <SelectTrigger className="rounded-xl text-sm h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="material">Material</SelectItem>
                <SelectItem value="electronic">Electronic</SelectItem>
                <SelectItem value="tool">Tool</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2">
            <Input
              value={mat.notes}
              onChange={e => update(i, "notes", e.target.value)}
              placeholder="Notes"
              className="rounded-xl text-sm"
            />
          </div>
          <div className="col-span-1 flex justify-center pt-1.5">
            <button onClick={() => remove(i)} className="text-muted-foreground hover:text-destructive transition-colors">
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={add} className="rounded-xl gap-1.5 text-xs">
        <Plus size={13} /> Add Item
      </Button>
    </div>
  );
}