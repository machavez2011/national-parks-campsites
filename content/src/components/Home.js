import React from "react";
import campground from "../pictures/campground.jpg";
import Header from "./Header";

const heroImage = {
  width: "100%"
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "Plan your next camping trip!"
    };
  }
  render() {
    return (
      <React.Fragment>
        <Header header={this.state.header} />
        <img src={campground} alt="wood" style={heroImage} />
        <p>
          Bacon ipsum dolor amet tongue short ribs burgdoggen tail, capicola
          strip steak doner brisket chicken filet mignon beef cow short loin.
          Alcatra meatloaf brisket strip steak filet mignon kevin. Buffalo ham
          hock pork loin flank porchetta ground round salami. Short ribs t-bone
          filet mignon kielbasa landjaeger pancetta ham hock rump bacon
          burgdoggen. Pancetta salami porchetta sirloin brisket flank tri-tip
          meatloaf short ribs pork belly ground round. Shank chicken short loin
          spare ribs. Brisket strip steak meatloaf tail pork chop shankle
          shoulder burgdoggen flank beef ribs chuck.
        </p>
        <p>
          Chuck pork chop tail short loin. Pork chop pancetta chuck burgdoggen
          tri-tip t-bone biltong pastrami andouille bresaola short ribs
          meatloaf. Salami buffalo ham alcatra doner brisket. Sausage andouille
          pig alcatra brisket, tail bresaola shank jowl meatloaf. Porchetta
          strip steak cupim leberkas.
        </p>
        <p>
          Fatback drumstick spare ribs alcatra sirloin, buffalo andouille pork
          belly bacon sausage. Biltong tri-tip corned beef beef ribs, t-bone
          flank hamburger swine frankfurter burgdoggen meatloaf sausage.
          Porchetta chicken corned beef jerky, swine cupim salami landjaeger
          brisket. Shoulder bresaola ball tip prosciutto, alcatra leberkas
          kielbasa ham hock boudin ribeye pastrami meatloaf beef ribs. Turkey
          brisket andouille ball tip ham pastrami.
        </p>
        <p>
          Meatloaf cupim picanha short ribs tail ham hock turkey, pork chop
          chicken short loin pastrami t-bone corned beef strip steak salami.
          Beef capicola ribeye prosciutto hamburger sausage picanha sirloin cow
          ham kielbasa pig pork belly. Landjaeger meatball cupim short loin
          chuck tenderloin. Flank ball tip tenderloin, short loin pork rump
          filet mignon biltong pastrami ribeye. Andouille turducken biltong
          tail. Short ribs bacon pork belly pork loin, alcatra leberkas salami.
          Brisket t-bone cupim landjaeger salami venison pork belly pig sausage
          corned beef shankle.
        </p>
      </React.Fragment>
    );
  }
}

export default Home;
