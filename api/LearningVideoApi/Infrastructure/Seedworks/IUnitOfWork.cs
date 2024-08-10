using Microsoft.EntityFrameworkCore.Storage;

namespace LearningVideoApi.Infrastructure.Seedworks
{
    public interface IUnitOfWork
    {
        public IDbContextTransaction Begin();

        public void Complete();

        public void Rollback();
    }
}
