import { useController, UseControllerProps, FieldValues } from 'react-hook-form';
import TextField, { TextFieldProps } from '@components/TextField';

export interface FormTextFieldProps<T extends FieldValues>
  extends Omit<UseControllerProps<T>, 'defaultValue'>,
    TextFieldProps {}

function FormTextField<T extends FieldValues>(props: FormTextFieldProps<T>) {
  const { name, control, rules, disabled } = props;

  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    disabled,
  });

  return (
    <TextField
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      error={error?.message}
      {...props}
    />
  );
}

export default FormTextField;
