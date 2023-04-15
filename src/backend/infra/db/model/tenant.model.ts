import { Tenant } from "@/backend/domain/tenant";
import { Schema, model, models } from "mongoose";

const TenantSchema: Schema = new Schema<Tenant>({
  id: { type: String },
  name: { type: String, required: true },
  apartment: { type: String, required: true },
});

const TenantModel = models.Tenant || model("Tenant", TenantSchema);

export default TenantModel;
