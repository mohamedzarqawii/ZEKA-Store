import { IconTrash } from "@tabler/icons-react";
import { ProductType } from "@/types/product";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import { useGetCart, useToggleCart } from "@/features/cart/pages/hooks/useCart";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";
import { Button } from "./ui/button";
import { useGetShopProduct } from "@/features/shop/pages/shop/hooks/useShop";

const Counter = ({
  product,
  classname,
  plusClass,
  minusClass,
  spanClass,
  trashSize,
}: {
  product: ProductType;
  classname?: string;
  plusClass?: string;
  minusClass?: string;
  spanClass?: string;
  trashSize?: string;
}) => {
  const {
    data,
    isLoading: isProductLoading,
    refetch: reGetProduct,
  } = useGetShopProduct(Number(product.id));
  const { data: currentUser, refetch } = useGetCurrentUser();
  const { data: cart = [], refetch: reGetCart } = useGetCart(currentUser?.id);
  const { mutateAsync: toggleCart, isPending } = useToggleCart();

  const cartItem = cart.find((item) => item?.productId === product?.id);

  const handleCartClick = async (
    e: React.MouseEvent,
    action: "add" | "decrease",
  ) => {
    e.preventDefault();

    if (!currentUser?.id) {
      toast.error("Please login to manage your cart");
      return;
    }

    await toggleCart({
      userId: currentUser.id,
      productId: product.id,
      action: action,
    });

    await Promise.all([reGetCart(), reGetProduct()]);
  };

  const disabled = () => {
    if (cartItem?.quantity == product.stock) {
      return true;
    } else return false;
  };

  if (!cartItem) {
    return;
  }
  return (
    <div
      className={classname}
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      <Button
        size={"none"}
        variant={"none"}
        className={minusClass}
        onClick={(e) => {
          handleCartClick(e, "decrease");
        }}
        disabled={isPending}
      >
        {cartItem.quantity > 1 ? "-" : <IconTrash className={trashSize} />}
      </Button>
      <div className={` ${spanClass}`}>
        {isPending ? (
          <span className="flex justify-center items-center gap-2">
            <Spinner data-icon="inline-start" />
          </span>
        ) : (
          `${cartItem?.quantity}`
        )}
      </div>
      <Button
        variant={"none"}
        size={"none"}
        className={plusClass}
        disabled={isPending || disabled()}
        onClick={(e) => {
          handleCartClick(e, "add");
        }}
      >
        +
      </Button>
    </div>
  );
};

export default Counter;
