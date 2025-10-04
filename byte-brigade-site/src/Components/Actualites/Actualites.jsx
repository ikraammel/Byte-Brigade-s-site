import "./Actualites.css"; // 👉 Importation du fichier CSS

function Actualites() {
  return (
    <div className="actualites-container">
      <h1 className="title">Les Actualités du Club</h1>

      {/* Description + Formulaire */}
      <p className="description">
        Nous lançons un formulaire pour les personnes intéressées par la{" "}
        <strong>capuche du club Byte Brigade</strong>.  
        Vous pouvez remplir le formulaire en cliquant sur le bouton ci-dessous.
      </p>

      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSf7FWVOpVl9Ndzk9onbKIhaKACxc53Qx2trNRk8cS5KM765gA/viewform?usp=dialog" 
        target="_blank"
        rel="noopener noreferrer"
        className="form-btn"
      >
        Remplir le formulaire
      </a>

      {/* Images Capuche Recto & Verso */}
      <div className="images-row">
        <div className="image-col">
          <img
            src="public/capuche-recto.jpeg"
            alt="Capuche Byte Brigade - Recto"
            className="product-image"
          />
          <p className="image-caption">
            <strong>Capuche Byte Brigade - Recto</strong>
          </p>
        </div>
        <div className="image-col">
          <img
            src="public/capuche-verso.jpeg"
            alt="Capuche Byte Brigade - Verso"
            className="product-image"
          />
          <p className="image-caption">
            <strong>Capuche Byte Brigade - Verso</strong>
          </p>
        </div>
      </div>

      <hr className="separator" />

      {/* Autres actualités */}
      <h2 className="subtitle">Autres Actualités</h2>
      <p className="other-news">
        Bientôt, d'autres annonces, projets et événements du club seront publiés ici.  
        Restez connectés pour ne rien manquer !
      </p>
    </div>
  );
}

export default Actualites;
