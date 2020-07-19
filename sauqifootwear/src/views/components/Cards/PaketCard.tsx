import React from "react";
import "./PaketCard.css";
import ButtonUI from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

interface PaketCardData {
  id: number;
  paketName: string;
  paketPrice: number;
  reviewPaket: number;
  imagePaket: string;
  
}

type PaketCardProps = {
  data: PaketCardData;
  className: string;
};

class PaketCard extends React.Component<PaketCardProps> {
  render() {
    const { id, paketName, paketPrice, reviewPaket, imagePaket } = this.props.data;
    return (
      <Link to={`/paket/${id}`}>
      <div className={`product-card d-inline-block ${this.props.className}`}>
        <img
          src={imagePaket}
          alt={this.props.data.paketName}
          style={{ width: "224px", height: "250px", objectFit: "contain" }}
        />
        <div>
          <p className="mt-3">{paketName}</p>
          <h5 style={{ fontWeight: "bolder" }}>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(paketPrice)}
          </h5>
          <p className="small">Vanya Park</p>
        </div>
        <div className="d-flex flex-row align-items-center justify-content-between mt-2">
          <div>
            <div className="d-flex flex-row align-items-center justify-content-between">
              {/* Render stars dynamically */}
              <FontAwesomeIcon style={{ fontSize: "10px" }} icon={faStar} />
              <FontAwesomeIcon style={{ fontSize: "10px" }} icon={faStar} />
              <FontAwesomeIcon style={{ fontSize: "10px" }} icon={faStar} />
              <FontAwesomeIcon style={{ fontSize: "10px" }} icon={faStar} />
              <FontAwesomeIcon style={{ fontSize: "10px" }} icon={faStar} />
              <small className="ml-2">4.5</small>
            </div>
          </div>
          <ButtonUI
            type="outlined"
            style={{ fontSize: "12px", padding: "4px 8px" }}
          >
            {" "}
            <FontAwesomeIcon icon={faHeart} /> Add to wishlist
          </ButtonUI>
        </div>
      </div>
      </Link>
    );
  }
}
export default PaketCard;