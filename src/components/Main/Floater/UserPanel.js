export default function UserPanel()
{
    return(
        <div className="py-3 floaterRight">
            <h4>Logged in as John Doe</h4>
            <ul className="list-unstyled">
            <li>Profile</li>
            <li>Settings</li>
            <li>Logout</li>
            </ul>
        </div>
    );
}