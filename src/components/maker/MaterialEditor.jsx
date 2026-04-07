import { useState } from "react";
import { Plus, Trash2, Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { base44 } from "@/api/base44Client";

export default function MaterialEditor({ materials = [], onChange }) {
  const [uploadingIdx, setUploadingIdx] = useState(null);

  const add = () => onChange([...materials, { name: "", quantity: "", category: "material", notes: "", image_url: "" }]);
  const remove = (i) => onChange(materials.filter((_, idx) => idx !== i));
  const update = (i, field, value) => {
    const updated = [...materials];
    updated[i] = { ...updated[i], [field]: value };
    onChange(updated);
  };

  const handleImageUpload = async (i, e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingIdx(i);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    update(i, "image_url", file_url);
    setUploadingIdx(null);
  };

  return (
    <div className="space-y-3">
      {materials.map((mat, i) => (
        <div key={i} className="border border-border/50 rounded-xl p-3 space-y-2 bg-muted/20">
          <div className="grid grid-cols-12 gap-2 items-center">
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
            <div className="col-span-1 flex justify-center">
              <button onClick={() => remove(i)} className="text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {/* Image row */}
          <div className="flex items-center gap-3">
            {mat.image_url ? (
              <div className="relative group">
                <img src={mat.image_url} alt={mat.name} className="w-16 h-16 object-cover rounded-lg border border-border/60" />
                <button
                  onClick={() => update(i, "image_url", "")}
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity"
                >
                  <Trash2 size={14} className="text-white" />
                </button>
              </div>
            ) : (
              <label className="w-16 h-16 rounded-lg border-2 border-dashed border-border/50 flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all text-muted-foreground">
                {uploadingIdx === i ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <>
                    <ImageIcon size={14} />
                    <span className="text-[10px] mt-0.5">Photo</span>
                  </>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(i, e)} disabled={uploadingIdx !== null} />
              </label>
            )}
            <p className="text-xs text-muted-foreground">Optional: add a photo of this component</p>
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={add} className="rounded-xl gap-1.5 text-xs">
        <Plus size={13} /> Add Item
      </Button>
    </div>
  );
}