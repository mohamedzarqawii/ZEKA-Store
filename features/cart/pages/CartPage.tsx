"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import ItemCart from "@/features/cart/components/CartItemCard";
import { useCreateOrder } from "@/features/profile/pages/orders/pages/hooks/useOrder";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetCart } from "./hooks/useCart";

const CartPage = () => {
  const router = useRouter();

  const { data: currentUser, isLoading } = useGetCurrentUser();
  const { mutate: createOrderMutation, isPending: isCreateOrder } =
    useCreateOrder();

  const handleCreateOrder = () => {
    if (!currentUser?.id) return;

    createOrderMutation(currentUser.id);
    router.push("/profile/orders");
  };

  const { data: cart = [], isLoading: isLoadingCart } = useGetCart(
    currentUser?.id,
  );

  console.log(currentUser?.id);

  const subtotal = cart.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);
  const shippingFee = cart.length > 0 ? 20 : 0;
  const total = subtotal + shippingFee;

  if (isLoadingCart) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-155px)] text-primary">
        Loading Cart...
      </div>
    );
  }
  return (
    <div className="mx-10">
      {cart.length > 0 ? (
        <div className="flex flex-col gap-10 mt-15">
          {/* 1 */}
          <div className="text-primary text-3xl">YOUR SHOPPING BAG</div>

          {/* 2 */}

          <div className="flex gap-10">
            {/* left */}
            <div className="flex flex-col gap-6 w-full">
              {cart.map((item) => (
                <ItemCart key={item.id} product={item.product} />
              ))}
            </div>

            {/* right */}

            <div className="top-24 sticky flex flex-col gap-8 bg-[#1a1a1a]/20 backdrop-blur-md p-7 border border-primary rounded-3xl w-200 h-fit">
              <div>ORDER SUMMARY</div>

              <div>
                <div className="flex justify-between">
                  <div>SubTotal</div>
                  <div>${subtotal.toFixed(2)}</div>
                </div>

                <div className="flex justify-between">
                  <div>Shipping Fee</div>
                  <div>${shippingFee.toFixed(2)}</div>
                </div>
              </div>
              <div className="bg-[#FEFEFE] h-px"></div>

              <div className="flex flex-col gap-6">
                <div className="flex justify-between">
                  <div className="font-bold text-2xl">TOTAL</div>
                  <div className="font-bold text-2xl">${total.toFixed(2)}</div>
                </div>

                <Button
                  variant={"none"}
                  size={"none"}
                  onClick={handleCreateOrder}
                  disabled={isCreateOrder}
                  className="bg-primary hover:bg-secondary disabled:opacity-70 px-4 py-4 rounded-lg font-extrabold text-center transition-colors duration-300"
                >
                  {isCreateOrder ? (
                    <span className="flex justify-center items-center gap-2">
                      <Spinner data-icon="inline-start" />
                      PROCESSING...
                    </span>
                  ) : (
                    "PROCEED TO CHECKOUT"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center h-[calc(100vh-155px)]">
          {/* 1 */}
          <div className="flex flex-col items-center gap-4">
            <div className="text-primary text-3xl">
              YOUR SHOPPING CART LOOK EMPTY !
            </div>
            <div className="text-xl">WHAT ARE YOU WAITING FOR?</div>
            <Link
              href="/shop"
              className="bg-primary hover:bg-secondary mt-4 px-4 py-4 rounded-lg font-extrabold text-center transition-colors duration-300 hover:cursor-pointer"
            >
              START SHOPPING NOW !
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default CartPage;
