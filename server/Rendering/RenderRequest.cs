namespace Server.Rendering
{
    public class RenderRequest 
    {
        public object cookies { get; set; }
        
        public object headers { get; set; }
        
        public object host { get; set; }
    }
}