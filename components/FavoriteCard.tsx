type FavoriteCardProps = {
  favorites: string;
};

const FavoriteProduct = ({ productId }: { productId: string }) => {
  return (
    <div>
      <div></div>
    </div>
  );
};

const FavoriteCard = ({ favorites }: FavoriteCardProps) => {
  return (
    <div>
      <div>
        <FavoriteProduct productId={favorites} />
      </div>
    </div>
  );
};

export default FavoriteCard;
