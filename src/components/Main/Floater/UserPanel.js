export default function UserPanel()
{
    return(
        <div className="py-3 floaterRight">
            
            <div className="dxa-underlined">
                <strong>Radoslav99</strong>
                <div className="userImgSmall" style={{background:"url(https://www.youredm.com/wp-content/uploads/2021/01/Flux-Pavilion-Press-Shot-1-2020-Fiona-Garden-1-750x500.jpg)"}}></div>
            </div>
            <ul className="list-unstyled">
            <li>Profile 👤</li>
            <li>Settings ⚙️</li>
            <li>Prefences 🎭</li>
            <li>Logout 🔐</li>
            </ul>
        </div>
    );
}