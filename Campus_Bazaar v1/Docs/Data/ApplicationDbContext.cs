using System.Reflection.Emit;
using Campus_Bazaar_v1.Models;
using Microsoft.EntityFrameworkCore;

namespace Campus_Bazaar_v1.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Department> Departments => Set<Department>();
        public DbSet<User> Users => Set<User>();
        public DbSet<Course> Courses => Set<Course>();
        public DbSet<Resource> Resources => Set<Resource>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Map entities to exact SQL Server table names
            modelBuilder.Entity<Department>().ToTable("Departments");
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Course>().ToTable("Courses");
            modelBuilder.Entity<Resource>().ToTable("Resources");
        }
    }
}