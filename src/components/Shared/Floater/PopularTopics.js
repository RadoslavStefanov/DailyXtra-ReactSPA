import { Link } from "react-router-dom";

export default function PopularTopics()
{
    const hotTopics = [
        {
          name: '👨🏻‍⚖️Politics',
          tab: 'politics'
        },{
          name: '🏆Sports',
          tab: 'sports'
        },{
          name: '🎮Entertainment',
          tab: 'entertainment'
        },{
          name: '📱Tech World',
          tab: 'techworld'
        },
      ];

    return(
        <div className="py-3 floaterLeft">
          <img src="/images/nav-logo.png" style={{ width:"40%" }}></img>
          <h3>Popular Topics</h3>
            <ul className="list-unstyled dxa-popular">
              <div>
                {hotTopics.map((topic, i) => (
                  <div key={i} className="my-4">
                    <Link to={`/${topic.tab}`}>{topic.name}</Link>
                  </div>
                ))}
              </div>
            </ul>
        </div>);
}