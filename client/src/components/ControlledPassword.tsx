import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Control, FieldValues, Path } from 'react-hook-form';


type Props<T extends FieldValues,Name extends Path<T>> = {
  control: Control<T>;
  name: Name;
  label:string
};

export const ControlledPassword =  <T extends FieldValues, Name extends Path<T>>( {
  control,
  name,
  label,
} : Props<T, Name>) => {

  const [isVisiblePwd,setIsVisiblePwd] = useState(false)
    
  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <div className="relative">
          <FormControl>
            <Input
              type={isVisiblePwd ? "text" : "password"}
              placeholder="Enter current password"
              {...field}
            />
          </FormControl>
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
            onClick={() => setIsVisiblePwd(!isVisiblePwd)}
          >
            {isVisiblePwd ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        <FormMessage />
      </FormItem>
    )}
  />
  )
}
