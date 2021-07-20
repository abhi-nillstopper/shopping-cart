import React from "react";
import { useHistory } from "react-router-dom";
import { Image, Button } from "react-bootstrap";

export default function ProductCategory(props) {
  const categoryImages = props.categoryImages;
  // const history = useHistory();

  const onCategoryClick = (categoryKey) => {
    props.history.push("/products", { categoryKey });
  };

  return (
    <>
      <div className="product-categories">
        {categoryImages.map((img, index) => {
          return (
            img.enabled && (
              <div key={img.key} className="category" data-testid="category">
                <Image alt={img.name} src={img.imageUrl} />
                <div className="description">
                  <h2>{img.name}</h2>
                  <h6>{img.description}</h6>
                  <Button
                    alt={img.name}
                    variant="danger"
                    onClick={() => onCategoryClick(img.key)}
                  >
                    {img.key}
                  </Button>
                </div>
              </div>
            )
          );
        })}
      </div>
    </>
  );
}
