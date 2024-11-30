import { Button, Image, Input, Textarea } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { useProductMutation } from "../../hooks";

interface FormInputs {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const NewProduct = () => {
  const { productMutation } = useProductMutation();

  const { control, watch, handleSubmit } = useForm<FormInputs>({
    defaultValues: {
      title: "",
      price: 0.0,
      description: "",
      category: "men's clothing",
      image: "",
    },
  });

  const imageUrl = watch("image");

  const onSubmit = handleSubmit((data) => productMutation.mutate(data));

  return (
    <div className="w-full flex-col">
      <h1 className="text-2xl font-bold">Nuevo producto</h1>

      <form className="w-full" onSubmit={onSubmit}>
        <div className="flex justify-around items-center">
          <div className="flex-col w-[500px]">
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <Input
                  className="mt-2"
                  type="text"
                  label="Titulo del producto"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <Input
                  className="mt-2"
                  type="number"
                  label="Precio del producto"
                  value={field.value?.toString()}
                  onChange={(evt) => field.onChange(Number(evt.target.value))}
                />
              )}
            />

            <Controller
              control={control}
              name="image"
              render={({ field }) => (
                <Input
                  className="mt-2"
                  type="url"
                  label="Url del producto"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <Textarea
                  className="mt-2"
                  label="Descripcion del producto"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <select
                  className="rounded-md p-3 mt-2 bg-gray-800 w-full"
                  value={field.value}
                  onChange={field.onChange}
                >
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="electronics">Electronics</option>
                </select>
              )}
            />

            <br />
            <Button
              className="mt-2"
              color="primary"
              type="submit"
              isDisabled={productMutation.isLoading}
            >
              {productMutation.isLoading ? "Procesando" : "Crear Producto"}
            </Button>
          </div>

          <div
            className="bg-white rounded-2xl p-10 flex items-center"
            style={{
              width: "500px",
              height: "600px",
            }}
          >
            <Image src={imageUrl} />
          </div>
        </div>
      </form>
    </div>
  );
};
