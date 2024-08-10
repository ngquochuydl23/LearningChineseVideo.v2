using LearningVideoApi.Infrastructure.Seedworks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;


namespace LearningVideoApi.Infrastructure
{

    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {

        private readonly LearningVideoDbContext _appDbContext;

        public Repository(LearningVideoDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public LearningVideoDbContext DbContext() => _appDbContext;

        private DbSet<TEntity> _entity => _appDbContext.Set<TEntity>();

        public virtual IQueryable<TEntity> GetQueryableNoTracking() => _entity.AsNoTracking();

        public virtual IQueryable<TEntity> GetQueryable() => _entity.AsQueryable();

        public virtual void Delete(TEntity entity)
        {
            if (entity == null)
                throw new NullReferenceException();

            if (entity is IDeleteEntity)
            {
                var deletedEntity = (IDeleteEntity)entity;
                deletedEntity.IsDeleted = true;
            }
            _appDbContext.Entry(entity).State = EntityState.Modified;
            SaveChange(entity);
        }

        public virtual TEntity Find(long? key)
        {
            return _entity.Find(key);
        }

        public virtual TEntity Insert(TEntity entity)
        {
            if (entity is IHasCreationTime)
            {
                var hasCreationTimeEntity = (IHasCreationTime)entity;
                hasCreationTimeEntity.CreatedAt = DateTime.Now;
            }

            _entity.Add(entity);
            _appDbContext.Entry(entity).State = EntityState.Added;

            SaveChange(entity);
            return entity;
        }

        public virtual TEntity Update(long key, TEntity entity)
        {
            if (entity == null)
                throw new NullReferenceException();

            if (entity is ILastUpdatedTime)
            {
                var lastUpdatedTime = (ILastUpdatedTime)entity;
                lastUpdatedTime.LastUpdated = DateTime.Now;
            }
            _appDbContext.Entry(entity).State = EntityState.Modified;
            SaveChange(entity);
            return entity;
        }

        protected virtual void SaveChange(TEntity entity)
        {
            _appDbContext.SaveChanges();
        }

        protected virtual void SaveChanges()
        {
            _appDbContext.SaveChanges();
        }
        void IRepository<TEntity>.SaveChanges()
        {
            SaveChanges();
        }
    }
}
