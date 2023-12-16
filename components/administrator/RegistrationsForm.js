import { noop } from "@/shared/utils/none";
import Registrations from "@/models/registration";
import ModelFormDialog from "@/shared/components/ModelFormDialog";

export default function RegistrationsForm({
  isOpen = false,
  edit,
  onClose = noop,
}) {
  return (
    <ModelFormDialog
      model={Registrations}
      isOpen={isOpen}
      onClose={onClose}
      title={edit ? "Update Student Registration Info" : "Register New Student"}
    />
  );
}
