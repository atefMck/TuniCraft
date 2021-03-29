import PostImg from 'assets/post-img.jpg'
import icon1 from 'assets/icon_1.png'
import icon2 from 'assets/icon_2.png'
import icon3 from 'assets/icon_3.png'
import icon4 from 'assets/icon_4.png'
import icon5 from 'assets/icon_5.png'
import icon6 from 'assets/icon_6.png'
import icon7 from 'assets/icon_7.png'

import { Post, Feature, Person } from 'components/Miscellaneous'

const hallOfFamePH = {
    'Enderman53': ["a", icon1],
    'CreePer69': ["b", icon2],
    'Zombify': ["c", icon3],
    'WitherHeather222': ["d", icon4],
    'xXCoolKidZombieXx': ["e", icon5],
    'SpiderfighterX': ["f", icon6],
    'Skeleboom545': ["g", icon7]
}
const featurePH = {
    title: "Dynamic Map",
    content: "Lorem ipsum dolor sit ametconse ctetur adipiscing elit.",
}
const postPH = {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "Feb 12, 2021",
    author: "WitherHeather222",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc risus lacus, lobortis sed eros eget, placerat facilisis urna. Nam laoreet diam in ornare ullamcorper. In imperdiet, libero quis ornare congue, enim orci imperdiet sem, vitae sollicitudin tellus ligula eu risus. Nullam porta mi at sagittis auctor. Quisque at convallis tortor, sit amet suscipit ante. Donec facilisis cursus lacus et elementum. Proin tempus est ligula, a sodales odio ultrices in. Quisque lacus eros, tempus vitae magna ac, efficitur consectetur lectus. In aliquet convallis arcu eget tincidunt. Morbi magna felis, consectetur quis eros eu, blandit dapibus odio. Nunc at mauris at erat accumsan convallis. Fusce faucibus sem mi, ac facilisis magna consequat et.",
    image: PostImg,
}

const feature = <Feature title={featurePH.title} content={featurePH.content} />
const post = <Post title={postPH.title} date={postPH.date} author={postPH.author} content={postPH.content} image={postPH.image} type={false} />
const postrev = <Post title={postPH.title} date={postPH.date} author={postPH.author} content={postPH.content} image={postPH.image} type={true} />
const icons = Object.keys(hallOfFamePH).map((name) => <Person index={hallOfFamePH[name][0]} name={name} avatar={hallOfFamePH[name][1]} />)

export { feature, post, postrev, icons }