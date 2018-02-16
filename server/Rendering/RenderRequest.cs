namespace Server.Rendering
{
    public class RenderRequest 
    {
        public object Cookies { get; set; }
        
        public object Headers { get; set; }
        
        public object Host { get; set; }
    }
}