using System.ComponentModel.DataAnnotations;

namespace LearningVideoApi.Models
{
    public class FromQueryAsCollection
    {
        [Range(0, Int32.MaxValue, ErrorMessage = "Enter number greater than 0 ")]
        public int? Offset { set; get; }

        public int? Limit { set; get; }
    }
}
