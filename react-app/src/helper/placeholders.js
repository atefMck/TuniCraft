import PostImg from 'assets/post-img.jpg'
import icon1 from 'assets/icon_1.png'
import icon2 from 'assets/icon_2.png'
import icon3 from 'assets/icon_3.png'
import icon4 from 'assets/icon_4.png'
import icon5 from 'assets/icon_5.png'
import icon6 from 'assets/icon_6.png'
import icon7 from 'assets/icon_7.png'

import { Post, Feature, Person, SubCategory } from 'components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faFileAlt
} from '@fortawesome/free-solid-svg-icons'

const hallOfFamePH = {
    'Enderman53': ["a", icon1, "ao"],
    'CreePer69': ["b", icon2, "bo"],
    'Zombify': ["c", icon3, "co"],
    'WitherHeather222': ["d", icon4, "do"],
    'xXCoolKidZombieXx': ["e", icon5, "eo"],
    'SpiderfighterX': ["f", icon6, "fo"],
    'Skeleboom545': ["g", icon7, "go"]
}
const featurePH = {
    id: "dynamic_map_feature",
    title: "Dynamic Map",
    content: "Lorem ipsum dolor sit ametconse ctetur adipiscing elit.",
    thumbnail: PostImg,
}
const postPH = {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "Feb 12, 2021",
    author: "WitherHeather222",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc risus lacus, lobortis sed eros eget, placerat facilisis urna. Nam laoreet diam in ornare ullamcorper. In imperdiet, libero quis ornare congue, enim orci imperdiet sem, vitae sollicitudin tellus ligula eu risus. Nullam porta mi at sagittis auctor. Quisque at convallis tortor, sit amet suscipit ante. Donec facilisis cursus lacus et elementum. Proin tempus est ligula, a sodales odio ultrices in. Quisque lacus eros, tempus vitae magna ac, efficitur consectetur lectus. In aliquet convallis arcu eget tincidunt. Morbi magna felis, consectetur quis eros eu, blandit dapibus odio. Nunc at mauris at erat accumsan convallis. Fusce faucibus sem mi, ac facilisis magna consequat et.",
    image: PostImg,
}

const categoryPH = {
    icon: <FontAwesomeIcon icon={faFileAlt}/>,
    name: "News and Announcements",
    threadCount: 465,
    messagesCount: 123,
    creator: "Duma",
    latestThread: {
        name: "SkyBlock 0.11.4",
        lastUpdated: "Today at 4:52 AM"
    },
}


const feature = <Feature id={featurePH.id} title={featurePH.title} content={featurePH.content} thumbnail={featurePH.thumbnail}/>
const postH = <Post postId={"postH"} title={postPH.title} date={postPH.date} author={postPH.author} content={postPH.content} image={postPH.image} type="horizontal" />
const postHrev = <Post postId={"postHrev"} title={postPH.title} date={postPH.date} author={postPH.author} content={postPH.content} image={postPH.image} type="horizontal reversed" />
const postV = <Post postId={"post_comp_1"} title={postPH.title} date={postPH.date} author={postPH.author} content={postPH.content} image={postPH.image} type="vertical" />
const icons = Object.keys(hallOfFamePH).map((name) => <Person key={hallOfFamePH[name][2]} index={hallOfFamePH[name][0]} name={name} avatar={hallOfFamePH[name][1]} />)
const forumCategory = <SubCategory className="icon" icon={categoryPH.icon} name={categoryPH.name} threadCount={categoryPH.threadCount} messagesCount={categoryPH.messagesCount} creator={categoryPH.creator} latestThread={categoryPH.latestThread} />
// const member = <MemberOnline memberId="12" avatar={avatar} username="lDuma" about="Server Owner" />

export { feature, postH, postHrev, postV, icons, forumCategory }