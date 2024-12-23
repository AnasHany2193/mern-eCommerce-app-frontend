import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

/**
 * Common form component
 * @description This component is used to render a form with the given props and controls and submits the form on submit
 */
const CommonForm = ({
  onSubmit,
  formData,
  setFormData,
  formControls,
  buttonContent,
  buttonDisabled,
}) => {
  function renderInputByComponentType(control) {
    let element = null;
    const value = formData[control.name];

    switch (control.componentType) {
      case "input":
        element = (
          <Input
            value={value}
            id={control.name}
            name={control.name}
            type={control.type}
            placeholder={control.placeholder}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select
            value={value}
            onValueChange={(value) =>
              setFormData({ ...formData, [control.name]: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={control.label} />
            </SelectTrigger>
            <SelectContent>
              {control.options && control.options.length > 0
                ? control.options.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            value={value}
            id={control.id}
            name={control.name}
            placeholder={control.placeholder}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
          />
        );
        break;
      default:
        element = (
          <Input
            value={value}
            id={control.name}
            name={control.name}
            type={control.type}
            placeholder={control.placeholder}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col w-full gap-2">
      {formControls.map((control) => (
        <div key={control.name}>
          <Label className="mb-1">{control.label}</Label>
          {renderInputByComponentType(control)}
        </div>
      ))}

      <Button
        type="submit"
        disabled={buttonDisabled}
        className="mt-2 bg-blue-500 hover:bg-blue-600"
      >
        {buttonContent || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
