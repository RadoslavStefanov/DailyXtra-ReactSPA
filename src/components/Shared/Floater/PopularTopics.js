export default function PopularTopics()
{
    const hotTopics = [
        {
          name: '👨🏻‍⚖️Politics'
        },{
          name: '🏆Sports'
        },{
          name: '🎮Entertainment'
        },{
          name: '📱Tech World'
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
                    <p>{topic.name}</p>
                  </div>
                ))}
              </div>
            </ul>
        </div>);
}