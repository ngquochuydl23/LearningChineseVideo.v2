namespace LearningVideoApi.Infrastructure.Seedworks
{
    public interface IRepository<TEntity>
    {
        TEntity Find(long? key);

        TEntity Insert(TEntity entity);

        TEntity Update(long key, TEntity entity);

        void Delete(TEntity entity);

        IQueryable<TEntity> GetQueryableNoTracking();

        IQueryable<TEntity> GetQueryable();

        LearningVideoDbContext DbContext();


        void SaveChanges();
    }
}
