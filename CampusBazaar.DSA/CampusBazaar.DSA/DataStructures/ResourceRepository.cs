using System;
using System.Collections.Generic;
using CampusBazaar.DSA.Models;

namespace CampusBazaar.DSA.DataStructures
{
    public class ResourceRepository
    {
        // Internal dictionary for O(1) lookups by ID: Key = ResourceId, Value = ResourceItem
        private Dictionary<int, ResourceItem> _storage;

        public ResourceRepository()
        {
            _storage = new Dictionary<int, ResourceItem>();
        }

        // O(1) Insertion
        public void AddResource(ResourceItem resource)
        {
            if (!_storage.ContainsKey(resource.Id))
            {
                _storage.Add(resource.Id, resource);
                Console.WriteLine($"[Success] Added: {resource.Title}");
            }
            else
            {
                Console.WriteLine($"[Error] Resource with ID {resource.Id} already exists!");
            }
        }

        // O(1) Instant Lookup by ID
        public ResourceItem GetResourceById(int id)
        {
            if (_storage.TryGetValue(id, out ResourceItem resource))
            {
                return resource;
            }
            return null; // Return null if not found
        }

        // O(1) Removal
        public bool RemoveResource(int id)
        {
            if (_storage.ContainsKey(id))
            {
                _storage.Remove(id);
                return true;
            }
            return false;
        }

        // Retrieve all resources for listing/displaying
        public List<ResourceItem> GetAllResources()
        {
            return new List<ResourceItem>(_storage.Values);
        }
    }
}