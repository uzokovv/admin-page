import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { useForm } from "react-hook-form"
import { useAuth } from '../../context';
import { toast } from 'react-toastify';

function ModeToggle() {

  type Inputs = {
    example: string
    exampleRequired: string
  }




  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  // necessary for server-side rendering
  // because mode is undefined on the server
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <Button variant="soft">Change mode</Button>;
  }

  return (
    <Select
      variant="soft"
      value={mode}
      onChange={(event, newMode) => {
        setMode(newMode);
        console.log(event);
      }}
      sx={{ width: 'max-content' }}
    >
      <Option value="system">System</Option>
      <Option value="light">Light</Option>
      <Option value="dark">Dark</Option>
    </Select>
  );
}

export default function LoginFinal() {
  const auth = useAuth()

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { phone_number: "", password: "" },
    mode: "onBlur"
  })

  const onSubmit = (data: any) => {
    console.log(data)
    const { phone_number, password } = data
    try {
      auth.login({ phone_number, password })
    } catch (error) {
      toast.error("Xatolik yuzaga keldi!")
    }
    console.log(errors);
  }
  return (
    <main>
      <ModeToggle />
      <CssBaseline />
      <Sheet
        sx={{
          width: 300,
          mx: 'auto', // margin left & right
          my: 4, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>Welcome!</b>
          </Typography>
          <Typography level="body-sm">Sign in to continue.</Typography>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <FormControl>
            <FormLabel>Number</FormLabel>
            <Input
              // html input attribute
              {...register("phone_number")}
              // name="text"
              type="text"
              placeholder="johndoe@email.com"
            />
            {/* <input {...register("phoneNumber")} type="text" /> */}
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              // html input attribute
              {...register("password")}
              name="password"
              type="password"
              placeholder="password"
            />
          </FormControl>
          <Button sx={{ mt: 1 /* margin top */ }} type='submit'>Log in</Button>
        </form>

      </Sheet>
    </main>
  );
}
